from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User

from base.models import Club, Review, Event
from base.serializers import ClubSerializer, UserSerializer, EventSerializer

from rest_framework import status


@api_view(['GET'])
def getClubs(request):
    clubs = Club.objects.all()
    serializer = ClubSerializer(clubs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getClub(request, pk):
    club = Club.objects.get(_id=pk)
    serializer = ClubSerializer(club, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createClub(request):
    user = request.user

    club = Club.objects.create(
        user=user,
        name='Sample Name',
        description=''
    )

    serializer = ClubSerializer(club, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateClub(request, pk):
    data = request.data
    club = Club.objects.get(_id=pk)

    club.name = data['name']
    club.description = data['description']

    club.save()

    serializer = ClubSerializer(club, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteClub(request, pk):
    club = Club.objects.get(_id=pk)
    club.delete()
    return Response('Club Deleted')


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    club_id = data['club_id']
    club = Club.objects.get(_id=club_id)

    club.image = request.FILES.get('image')
    club.save()

    return Response('Image was uploaded')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createEvent(request, pk):
    user = request.user
    club = Club.objects.get(_id=pk)
    data = request.data

    event = Event.objects.create(
            user=user,
            club=club,
            name=user.first_name,
            description=data['description'],
    )

    events = club.event_set.all()

    return Response('Event Added')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createClubReview(request, pk):
    user = request.user
    club = Club.objects.get(_id=pk)
    data = request.data

    # 1 - Review already exists
    alreadyExists = club.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'Club already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - No Rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
        review = Review.objects.create(
            user=user,
            club=club,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = club.review_set.all()
        club.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        club.rating = total / len(reviews)
        club.save()

        return Response('Review Added')


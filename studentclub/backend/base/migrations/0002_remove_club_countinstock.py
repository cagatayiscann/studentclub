# Generated by Django 4.1.4 on 2022-12-23 16:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='club',
            name='countInStock',
        ),
    ]
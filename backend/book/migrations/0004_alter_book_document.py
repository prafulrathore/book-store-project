# Generated by Django 3.2.1 on 2021-06-07 12:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('book', '0003_alter_book_document'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='document',
            field=models.FileField(blank=True, upload_to='documents/'),
        ),
    ]

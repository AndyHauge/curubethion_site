# Generated by Django 4.1.1 on 2022-10-10 15:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainpages', '0002_alter_link_description_alter_link_link_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='slug_name',
            field=models.CharField(default='default', help_text='Display name for category page', max_length=25),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='link',
            name='display_name',
            field=models.CharField(help_text='Name as displayed on page', max_length=25),
        ),
    ]

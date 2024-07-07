# Saturated

[Live link](https://saturated.netlify.app/)

[Backend repo](https://github.com/jasonHYLam/saturated-backend)

![image](https://github.com/jasonHYLam/saturated-frontend/assets/105083538/034c6a41-9821-4b65-a757-eb83df0a1920)


This app is intended to help budding artists by helping them perform art studies. Art studies allows people to improve their art skills by developing their observation skills.

This app is not intended for commercial use. I do not own any of the images; all credits go towards all original artists.

## Usage:

- Users will need to create an account and login in order to perform art studies. A guest account is provided to let users trial the app.
- They can upload an image they wish to study from, and provide a title and link to the original artwork.
- They can analyse the image's color data by moving the cursor over it.
- They can create notes by clicking on a particular pixel; the user is then prompted to enter some information, as well as guess the color of the pixel. The created note contains the original and guessed color data as well as input text.

## Background:

I created this app to help myself and others learn art. I wanted a simple, free web-app that would help me to perform art studies and easily access them.

- Popular note-taking web applications such as Notion lack image analysis features as well as the ability to 'tag' images with notes.
- Additionally I found popular graphics editing software such as Photoshop to be too cumbersome when creating notes for studies. Access to these studies is limited only on their software/subscription service.

Saturated aims to address all of these issues.

## Features:

- Note writing: Users can write notes referencing a particular location on the image.
- Image tagging: When creating a note, users can add a marker onto the study image at a particular location which corresponds to the note.
- Color analysis: Users can obtain the color of a particular pixel when creating a note.
- Color recreation: Users can build their color knowledge by guessing the color at a particular location.
- Ease of access: Users need only login to access their studies, which can be done on any device.
- Supported on desktop and mobile.
- Guest account to trial the app.

## Technologies:

- Typescript frontend
- Canvas API
- C# ASP.NET Core backend; ASP.NET Core Identity for authentication, Entity Framework Core as ORM
- PostgreSQL flexible server
- Cloudinary for media storage
- Frontend deployed using Netlify, backend deployed using Microsoft Azure App Service

## Todo:

- Implement more granular color analysis, such as specific metrics for hue, saturation and value.
- Implement color value analysis with grayscale mode.
- Nicer layout for landscape images on mobile.

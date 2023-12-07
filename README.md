# dev

# ICook by Impastas

## Description

We are developing a web application known as iCook. iCook is intended to be used by anyone (with any level of cooking experience)! There are no requirements to use our application, but if you want to share your own recipes, or thoughts, you must have an account. You can sign up using any Google account, which makes it much easier! Without an account, you still have the ability to browse the website. However, once logged into an account, you can personalize your profile, share your own recipes, comment on recipes, like recipes, or report inappropriate content. To sum it up, once an account is made you are officially a part of our community!

In order to deploy our website, one must first purchase a domain name then create an account on Vercel which can directly connect to the Git repository and host the web server. An additional requirement for deploying iCook is to set up and host a MySQL database. The environment for this system must include a few variables such as the Google client and secret keys, a MySQL database URL, a secret authentication key, and an UploadThing Client and Secret key.

## Installation

Prereqs:

- Download node on pc
- MySQL local database

1. run `npm install`

## Setup

Dev:

If you want to run this in development mode so that changes you make to the code will immediatly update the website once the files have been saved. This may cause the CSS to break randomly as the constant refreshing will sometimes skip the CSS.

1. `npm run dev`
2. click on the link that is provided

Production Build:

If you want this to be run how it will be run on a server, and without the random CSS breaks.

1. `npm run build`
2. `npm start`
3. click on the link that is provided

## Authors and acknowledgment

Xander Waugh
Tai Meade
Cullen Danilowicz
Kaleb Cantrell
Fletcher Mutert

## Project status

This project was created as a project for school so it is currently put aside as the creators are focused on finishing our degrees.

# Reborn

This is a market place for users to buy and sell secondhand products.

## User Journies

The app has two groups of target audience: buyers and sellers.

Buyers can see an overview of products on homepage including picture, title, price, and the neighborhood it's being sold in. They can also search for products. By clicking on each item, users can see additional details of the product like date it was posted, description, and a map of the neighborhood.
To keep the app safe and protect the seller's data, no more details of location is shared.
Once the user decides on buying a product, they can click on "message the seller". They are then redirected to the Messages page and can contact the seller and set a meeting to see and buy the product.

Sellers can click on "Sell your product" and they will be navigated to a loging/sign up page. Alternatively they can click on the top right icon on the homepage to login. There they have the option of either signing up manually or through Google. Once they log in, Thet're redirected to homepage and can now see their profile picture on top right corner, and also two new navigation icon on the navbar: profile and messages.

By clicking on profile they can see their information that were shared through google: profile picture, name, and email address. They can also edit their informaton and add description using the "edit" button. A list of their added products with some details will be shown here under "your products". They also have the option to sign out.

By clicking on "sell your product" they will be redirected to a form where they fill out their product info and upload a picture. By submitting the form, the product is added to the homepage and also their profile page. Once on homepage, they can click on their profile to see details, edit the info, or delete it. 

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

Installation:

`npm install`

To Start Server:

`npm run dev`

To Visit App:

`localhost:3000`

## Technologies used in the Project

This is a full stack project developed using `React`, `Next.js` and `MongoDB`. 

`Styled Component` is the library used for CSS styling of the app.

`Mapbox API` is used to make the maps interactive and create a better user experience.

`Next Auth` is used for the authentication.

For the image upload, `Cloudinary` is used.

The messaging is developed using the service from `Ably`. It's a feature to be further developed and only the free version of Ably is used, so the functionality is a bit compromised.

The app is fully responsive.


## Project Screen Shots

<img src="/public/Screenshot1.png" alt="screenshot1" width="500"/>

<img src="/public/Screenshot2.png" alt="screenshot2" width="500"/>

<img src="/public/Screenshot3.png" alt="screenshot3" width="500"/>

<img src="/public/Screenshot4.png" alt="screenshot4" width="500"/>


---
slug: boonchubike-cms
title: "Boonchubike CMS"
tags: [ "TypeScript", "React" ]
description: "Client management system for Boonchubike, a bicycle store in Thailand."
pubDate: 2025-08-08
---

In this project, I created a client management system for Boonchubike, a bicycle store in Thailand. The problem was that
the store is growing massively over the past 30 years, and they have a lot of customers both new and
returning. The store owner is not a tech-guy. He has been using **800+ pages word document (as of
current version)** to print the address label on packages when delivering across country. Clearly, this is not an ideal
solution. It requires a lot of manual works and is easily prone to errors.

![Thumbnail](./thumbnail.webp)

## Addressing Pain Points

The solution is a system that allows client address management, where each **client is tied to one or more addresses.**
Everytime a new online order is made, the owner can just go on the website and press print to **generate a new PDF that
is ready** to use without worrying about formatting, if the customer is a returning customer. In other case, can just do
the process from scratch and then it can be reused later.

## Tech Stack and Architecture

I built the frontend using **React with TypeScript**, styled with **Tailwind CSS.** For state management and server
interactions, I used **TanStack Query** which made data fetching and caching much more efficient. The UI components are
built with **shadcn/ui library**, allowing me to create reusable components that maintain consistent styling throughout
the application.

> The data is stored in **Firebase Firestore** since we don't have complex relational data here. This choice made sense for the simplicity and scalability needed.

## External API Integration

Most modern tech systems can auto-fill the address using postal code. In Thailand, this is the case as well, although
the codes are not that precise compared to Singapore, meaning that it is not just plug and play. The frontend needs to
be able to select the value after filtering the relevant locations using the postal code.

The address API is a public API that I also developed as a side project. It is a **REST API** developed in **Go** that
uses **SQLite** database for simplicity and can return the required information in JSON format. You can take a look at
the API [here](https://github.com/oadultradeepfield/thai-address-api).

<figure>

![Thai Address API Integration](./address_api.webp)

<figcaption>

Example of the address API integration in the frontend.

</figcaption>

</figure>

<figure>

![PDF Generation](./example_pdf.webp)

<figcaption>

Example of the PDF generation feature in the frontend.

</figcaption>

</figure>

## Deployment and CI/CD

Since the scale of the application is quite small, I decided to use **Firebase Hosting** for the deployment. It is free
for small scale applications and easy to set up. The hosting is integrated with Firebase Firestore, so the data can be
accessed directly from the frontend without any additional configuration.

I also setup **GitHub Actions** to automate the deployment process, so that every time I push a new commit to the main
branch, the application will be automatically deployed to Firebase Hosting.

# Collectors
Manage Hot Wheels collections via scanning the UPC barcodes on the packaging.

## Description:

**Front End**: JavaScript, React, TailwindCSS

**Back End**: Node.js, Express, PostgreSQL

When a user purchases a new Hot Wheels car for their collection, adding that car to a list can be tedious. If the user has many cars the problem is amplified.

Collectors allows users to quickly add cars to their collection via scanning the UPC barcode on the packaging. The barcode is passed to an external API (UPCitemdb) 
and information on that car is returned and saved to a PostgreSQL database using a RESTful API built with Node.js and Express.

## Lessons Learned:

In an effort to reduce code, the ItemDetails component became quite complex. I wanted one page that could be used for creating and updating data but at some point, the page had
too much code. The page went through refactors to move code to other files so that the page would be easier to read and work with. I wanted to reduce the complexity so that
code changes could be made with far less hassle.





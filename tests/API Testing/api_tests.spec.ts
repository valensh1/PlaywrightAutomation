import { test, expect } from '@playwright/test';

// API Tests from https://restful-booker.herokuapp.com/apidoc/index.html#api-Booking-CreateBooking
// Create booking
test('Create Booking with POST request and then validate that GET request sends correct response body back', { tag: '@TG-T5' }, async ({ request }) => {
    const price = 10;
    const body = {
        "firstname": "Brock",
        "lastname": "Purdy",
        "totalprice": price,
        "depositpaid": false,
        "bookingdates": {
            "checkin": "2024-04-05",
            "checkout": "2024-04-27"
        },
        "additionalneeds": "Super Bowl Ring"
    }

    // POST REQUEST - Create a booking
    const response = await request.post('https://restful-booker.herokuapp.com/booking', {
        headers: { 'Content-Type': 'application/json' },
        data: body
    })
    expect(response.status()).toBe(200);
    const data = await response.json();
    const bookingID = data.bookingid; // Get booking ID from POST response to pass to GET request below to get booking information

    // GET REQUEST - Get Booking (need to provide bookingID)
    const getResponse = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingID}`);
    const getResponseData = await getResponse.json();
    expect(getResponseData).toEqual(expect.objectContaining(body));

})


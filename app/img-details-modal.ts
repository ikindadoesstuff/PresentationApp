import { EventData, Page, View, ShownModallyData, fromObject, Button } from '@nativescript/core'
import * as Email from '@nativescript/email'
import { Booking} from './main-view-model'

let booking: Booking;
let page: Page;

export function onShownModally(args: ShownModallyData) {
    const context = args.context;
    page = <Page>args.object; // Get the page associated with this script
    booking = new Booking(context.destination)
    
    page.bindingContext = fromObject({
        name: context.destination.name,
        image: context.destination.pictures[0], // Add the Image object to the binding context
        description: context.destination.description,
        adultPrice: context.destination.adultPrice,
        childPrice: context.destination.childPrice,
        adultOnly: context.destination.adultOnly,
        booking: booking,
    });
    console.log(`${context.image} is the image`);
}

export function onCalculate(args: EventData) {
    const btn = <Button>args.object;
    const adult = (btn.parent.id === "adults")
    console.log(adult)
    if (btn.id === "add") {
        if (adult) {
            booking.adults += 1;
            page.bindingContext.notifyPropertyChange('booking', booking);
        } else {
            booking.children += 1;
            page.bindingContext.notifyPropertyChange('booking', booking);
        }
        console.log(booking)
    } else if (btn.id === "subtract") {
        if (adult && booking.adults > 0) {
            booking.adults -= 1;
            page.bindingContext.notifyPropertyChange('booking', booking);
        } else if (!adult && booking.children > 0) {
            booking.children -= 1;
            page.bindingContext.notifyPropertyChange('booking', booking);
        }
    }
}

export function onCloseModal(args: EventData) {
    const view = args.object as View;
    view.closeModal();
}

export function onSendEmail(args: EventData) {
    if (!Email.available()) {
        console.log("Email is not available on this device.");
        return;
    }

    const recipientEmail = "devyonlozano@gmail.com";

    const emailOptions = {
        to: [recipientEmail],
        subject: `Booking Details for ${booking.destination.name}`,
        body: `${booking.adults > 1 ? "We're" : "I'm"} looking to book a tour with Unbelizeably Fun!
        Destination: ${booking.destination.name}
        Adults: ${booking.adults}
        Children: ${booking.children}
        Total: ${booking.total}
        `,
    };

    Email.compose(emailOptions).then(() => {
        console.log("Email setup successfully.");
    }).catch((error) => {
        console.error("Failed to send email:", error);
    });
}

import { EventData, Page, Label, Image, ShowModalOptions, View } from '@nativescript/core'
import { MainViewModel } from './main-view-model'

let page: Page;

export function navigatingTo(args: EventData) {
    page = <Page>args.object;
    page.bindingContext = new MainViewModel();
    console.log(page.bindingContext.destinationsObservable)
}

export function onImageTap(args: EventData) {
    const view = <View>args.object;
    const image = <Image>args.object;
    let labelText = "";
    image.parent.eachChild((child) => {
        if (child instanceof Label) {
            labelText = child.text;
            return false;
        }
        return true;
    });

    const destination = page.bindingContext.destinationsObservable.find((dest) => dest.name === labelText);
    if (destination) {
        console.log("Found destination:", destination);
    } else {
        console.log("Destination not found for label:", labelText);
    }

    const options: ShowModalOptions = {
        context: {
            destination
        },
        closeCallback: () => {
            console.log("Modal closed");
        },
    };
    console.log(image.src);
    view.showModal("img-details-modal", options);
}

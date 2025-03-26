import { Observable, Image, ObservableArray } from '@nativescript/core';

export class Booking extends Observable {
	private _email: string;
	private _destination: Destination;
	private _adults: number;
	private _children: number;
	private _total: number;
	
	constructor(destination: Destination) {
		super()
		this._destination = destination;
		this._adults = 0;
		this._children = 0;
		this._total = 0;
	}

	public get email(): string {
		return this._email
	}
	public set email(email: string) {
		this._email = email;
	}

	public get destination(): Destination {
		return this._destination
	}
	public set destination(dest: Destination) {
		this._destination = dest;
	}

	public get adults(): number {
		return this._adults
	}
	public set adults(adults: number) {
		this._adults = adults;
		this._total = ((this._destination.adultPrice*this._adults) + (this._destination.childPrice*this._children))
	}

	public get children(): number {
		return this._children
	}
	public set children(children: number) {
		this._children = children;
		this._total = ((this._destination.adultPrice*this._adults) + (this._destination.childPrice*this._children))
	}
	public get total(): number {
		return this._total;
	}
}

export class Destination {
	private _name: string;
	private _description: string;
	private _adultPrice: number;
	private _childPrice: number;
	private _pictures: string[] = [];
	private _adultOnly: boolean;

	constructor(name: string, description: string, adultPrice: number, pictures: string[], adultOnly:boolean = false) {
		this._name = name;
		this._description = description;
		this._adultPrice = adultPrice;
		this._childPrice = adultPrice / 2;
		this._pictures = pictures;
		this._adultOnly = adultOnly;
	}

	public get name(): string {
		return this._name;
	}
	public set name(value: string) {
		this._name = value;
	}

	public get description(): string {
		return this._description;
	}
	public set description(value: string) {
		this._description = value;
	}

	public get adultPrice(): number {
		return this._adultPrice;
	}
	public set adultPrice(value: number) {
		this._adultPrice = value;
		this._childPrice = value / 2;
	}

	public get childPrice(): number {
		return this._childPrice;
	}

	public get pictures(): string[] {
		return this._pictures;
	}
	public set pictures(value: string[]) {
		this._pictures = value;
	}

	public get adultOnly(): boolean {
		return this._adultOnly;
	}
	public set adultOnly(value: boolean) {
		this._adultOnly = value;
	}
}

export class MainViewModel extends Observable {
	public destinationsObservable: ObservableArray<Destination>;
	private destinationDetails: Destination[];

	constructor() {
		super();

		this.destinationsObservable = new ObservableArray<Destination>();
		this.destinationDetails = [
			new Destination(
				"Altun Ha Maya Ruins",
				"Explore the ancient Maya city of Altun Ha, a fascinating archaeological site that offers a glimpse into the rich history and culture of the Maya civilization. Known for its iconic temple, the Temple of the Masonry Altars, this site is surrounded by lush greenery and provides a serene yet awe-inspiring experience for history enthusiasts and adventurers alike.",
				50,
				["~/img/Altun_Ha.jpg"]
			),
			new Destination(
				"Xunantunich Maya Ruins",
				"Visit Xunantunich, a breathtaking archaeological site located atop a ridge overlooking the Mopan River. This site is home to the impressive El Castillo pyramid, which offers panoramic views of the surrounding jungle. Immerse yourself in the history and grandeur of the ancient Maya civilization as you explore the well-preserved structures and learn about their significance.",
				70,
				["~/img/Xunantunich.jpg"]
			),
			new Destination(
				"Jaguar Paw Cave Adventures",
				"Experience the thrill of Jaguar Paw Cave Adventures, where you can embark on an unforgettable journey through Belize's lush jungle. Enjoy activities like cave tubing, where you float through ancient caves on a gentle river, and ziplining, which lets you soar above the treetops for a bird's-eye view of the stunning landscape. This adventure is perfect for adrenaline seekers and nature lovers alike.",
				150,
				["~/img/Jaguar_Paw.jpg"]
			),
			new Destination(
				"Ziplining",
				"Soar through the treetops on an exhilarating ziplining adventure in the heart of Belize's rainforest. Feel the rush of adrenaline as you glide from platform to platform, surrounded by the sights and sounds of nature. This activity offers a unique perspective of the jungle and is an unforgettable experience for thrill-seekers of all ages.",
				90,
				["~/img/Ziplining.jpg"]
			),
			new Destination(
				"River Tours",
				"Enjoy a relaxing and scenic river tour that takes you through the serene waterways of Belize. Marvel at the natural beauty of the landscape, spot exotic wildlife, and learn about the region's rich biodiversity from knowledgeable guides. Whether you're looking for a peaceful escape or a chance to connect with nature, this tour offers something for everyone.",
				120,
				["~/img/rivertours.jpg"]
			),
			new Destination(
				"Travellers Rum Museum and Tasting",
				"Discover the rich history and craftsmanship behind Belizean rum at the Travellers Rum Museum. This unique experience includes a guided tour of the museum, where you'll learn about the rum-making process and its cultural significance. Cap off your visit with a tasting session, sampling some of the finest rums Belize has to offer.",
				75,
				["~/img/rum.png"],
				true
			),
			new Destination(
				"Placencia Beach Tour",
				"Relax and unwind on the pristine beaches of Placencia, a tropical paradise known for its crystal-clear waters and soft sandy shores. Whether you're soaking up the sun, swimming in the turquoise sea, or enjoying fresh seafood at a beachfront restaurant, this tour offers the perfect escape for those seeking tranquility and natural beauty.",
				200,
				["~/img/Placencia.jpg"]
			),
			new Destination(
				"Belizean Restaurant Tour",
				"Savor the diverse and flavorful cuisine of Belize with a guided restaurant tour that takes you to some of the best local dining spots. From traditional dishes like rice and beans to fresh seafood and exotic desserts, this tour is a culinary journey that showcases the rich cultural heritage and vibrant flavors of Belizean food.",
				180,
				["~/img/belizeanfood.jpg"]
			),
		];

		for (let i of this.destinationDetails) {
			console.log(i);
			this.destinationsObservable.push(i);
		}
	}
}

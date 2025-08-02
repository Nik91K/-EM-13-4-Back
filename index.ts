import bands from './bandsDiff.json'

type MusicBand = {
  name: string;
  genre: string;
  members: BandMember[];
  originCountry: string;
  foundedYear: number;
  isStillActive: boolean;
  albums: Album[];
  trackCount: number;
  albumCount: number;
}

type BandMember = {
  name: string;
  instrument: string;
  birthYear: number;
  joinedYear: number;
  leftYear?: number; 
}

type Album = {
  title: string;
  releaseYear: number;
  tracks: Track[];
}

type Track = {
  title: string;
  durationInSeconds: number;
  releaseYear: number
}

function isEmptyString (data: string): boolean {
    if (typeof data === 'string' && data.trim() !== '') {
        return true
    }
    return false
}

function isNegativeNumber (data: number): boolean {
    if (typeof data === 'number' && data >= 0) {
        return true
    }
    return false
}

function isBoolean (data: boolean ): boolean {
    if (typeof data === 'boolean') {
        return true
    }
    return false
}

function numberValidation (data: number): boolean {
    if (typeof data !== 'number') {
        return false
    }
    if (data < 0) {
        return false
    }
    return true
}


function validTrack (tracks: Track): boolean {
    if (!tracks) {
        return false
    }
    if (
        !isEmptyString(tracks.title) ||
        !isNegativeNumber(tracks.durationInSeconds) ||
        !isNegativeNumber(tracks.releaseYear)
    ) {
        return false
    }
    return true
}

function validAlbum (albums: Album): boolean  {
    if (!albums) {
        return false
    }
    if (
        !numberValidation(albums.releaseYear)||
        !isEmptyString(albums.title) ||
        !Array.isArray(albums.tracks)
    ) {
        return false
    }
    if (!albums.tracks.every(validTrack)) {
        return false
    }
    return true
}

function validBandMember (member: BandMember): boolean {
    if (!member) {
        return false
    }
    if (
        !isEmptyString(member.name)||
        !isEmptyString(member.instrument)||
        !isNegativeNumber(member.birthYear)||
        !isNegativeNumber(member.joinedYear)
    ) {
        return false
    }
    return true
}

function validMusicBand (band: MusicBand): boolean {
    if (!band) {
        return false
    }
    if (
        !isEmptyString(band.name) ||
        !isEmptyString(band.genre) ||
        !isEmptyString(band.originCountry) ||
        !isNegativeNumber(band.foundedYear) ||
        !isBoolean(band.isStillActive) ||
        !isNegativeNumber(band.trackCount) ||
        !isNegativeNumber(band.albumCount) ||
        !Array.isArray(band.members) ||
        !Array.isArray(band.albums)
    ){
        return false
    }
    if (!band.members.every(validBandMember) || !band.albums.every(validAlbum)) {
        return false
    }
    return true
}

let bandList: MusicBand[] = (bands as MusicBand[]).filter(validMusicBand)
let members = bandList.flatMap(bands => bands.members)

// Задача 1

console.log(bandList.reduce((sum, bands) => sum + bands.albumCount, 0))

// Задача 2

type TrackInfo = {
  bandName: string
  trackName: string
  duration: number
}


function formatTime (seconds: number): string {
    let min = Math.floor(seconds / 60)
    let sec = seconds%60
    return `${min} хвилин  ${sec} секунд`
}

let more250:TrackInfo[] = bandList.flatMap(bands => bands.albums.flatMap(album => 
    album.tracks
        .filter(track => track.durationInSeconds > 250))
        .map(tracks => ({
            bandName: bands.name,
            trackName: tracks.title,
            duration: tracks.durationInSeconds
        }))
)

more250.forEach(({bandName, trackName, duration}) => {
    console.log(`${bandName} - ${trackName}  -  ${formatTime(duration)}`)
})

// Задача 3

let nameBand: Record<string, string[]> = {}

bandList.forEach(bands => {
    let country = bands.originCountry
    if (!nameBand[country]) {
        nameBand[country] = []
    }
    bands.members.forEach(members => {
        nameBand[country].push(members.name)
    })
})

console.log(nameBand)

// Задача 4

console.log(members.length)

// Задача 5

let guitar = members.filter(members => members.instrument == 'Guitar')
console.log(guitar.sort((a, b) => a.birthYear - b.birthYear))

// Задача 6

function getLetters(start: string): string[] {
    return start.split('').filter(letter => /[a-z]/i.test(letter)).map(letter => letter.toLowerCase())
}

function numberCounting(letter: string): void {
    count[letter] = (count[letter] || 0) + 1
}

let count: Record<string, number> = {}

bandList.forEach(bands => {
    getLetters(bands.name).forEach(numberCounting)

    bands.albums.forEach(albums => {
        getLetters(albums.title).forEach(getLetters)
    })

    bands.members.flatMap(members => {
        getLetters(members.name).forEach(getLetters)
    })
})

console.log(count)

// Задача 1.1

class Car {
    brand: string;
    year: number;
    private mileage: number;
    private _gasolinCapacity: number;
    private fuelConsumption: number;
    constructor() {
        this.brand = "Audi A5"
        this.year = 2023
        this.fuelConsumption = 26
    }

    drive(km: number) {
        let mil = km / 1.609
        let mpg = this.fuelConsumption
        let gallonsUse = mil / mpg
        let liters = gallonsUse * 3.785

        if (liters > this._gasolinCapacity) {
            console.log('Недостатньо пального')
        }
    }

    get milage(): number {
        return this.mileage
    }

    get gasolinCapacity(): number {
        return this._gasolinCapacity
    }

    set gasolinCapacity(data: number) {
        if (data >= 0) {
            this._gasolinCapacity = data
        } else {
            console.log('Обʼєм не можу бути 0')
        }

    }

}

// Задача 1.2

class Comment {
    userName: string;
    title: string;
    date: Date;
    stars: number;
    text: string;
    advantages?: string;
    disadvantage?: string;
    like: number;
    dislike: number;

    constructor () {
        this.userName = 'Валентина Омельчук'
        this.title = 'Відгук від покупця. Продавець: SBT group'
        this.date = new Date()
        this.stars = 5
        this.text = 'Чудовий подарунок, як для дитини, так і для дорослого. Приємним бонусом було, що це не лише конструктор, а і світильник. Прийшло вчасно та з усіма деталями'
        this.advantages = 'Приємна ціна та цікавий варіант подарунку'
        this.like = 0
        this.dislike = 0
    }

}

// Задача 1.3

type RoomsTypes = "Single" | "Double" | "Suite"

class Room {
    roomNumber: number;
    type: RoomsTypes;
    price: number;
    isAvaileble: boolean;
    floor?: number;

    constructor () {
        this.roomNumber = 45
        this.type = 'Single'
        this.isAvaileble = true
        this.floor = 2
        this.price = 4000
    }

}

class Hotel {
    name: string;
    rating: number;
    rooms: Room[];

    constructor(name: string, rating: number, rooms: Room[]) {
        this.name = name
        this.rating = rating
        this.rooms = rooms
    }


    bookRoom (type: RoomsTypes, floor?: number): Room {
        let isAvaileble = this.rooms.find(rooms => 
            rooms.type === type && 
            rooms.isAvaileble &&
            rooms.floor == floor
        )

        if (isAvaileble) {
            isAvaileble.isAvaileble = false
            return isAvaileble
        }

        return null
    }

}

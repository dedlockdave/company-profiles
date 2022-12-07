import moment from 'moment';
import {v4 as uuidv4} from 'uuid';
import { supabase } from '../utils/supabase';

// @ts-ignore
import {prng_alea} from 'esm-seedrandom';


export class Quote {
    public id: string = uuidv4()
    public author: string = ""
    public quote: string = ""
    public constructor(init?: Partial<Quote>) {
        Object.assign(this, init);
    }
}

export async function getQuoteSeed() {
    let res = await fetch("https://zenquotes.io/api/quotes")
    return res.json()
}


export async function insertQuotes(quotes : Quote[]){
    const { data, error } = await supabase
        .from('quotes')
        .upsert(quotes, {onConflict: "quote"})

    if (error) throw Error(`could not insertQuotes ${error.message}`)

}

export async function getRandomQuote() {
    const { data, error } = await supabase
    .from('quotes')
    .select()
    if (error) throw Error(`could not get data ${error.message}`)
    let quotes = data as Quote[]
    return quotes[randomInt(0, 549)]

}

function randomInt(min :number, max : number) {
    let seed = moment().format("MMM Do")
    let rnd = prng_alea(seed);
    return Math.floor(rnd()) * (max - min) + min;
  }
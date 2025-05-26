import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rd = readline.createInterface({input, output});

export async function questionNumber(question: string) {
    return Number((await rd.question(`${question}`)).trim());
}

export async function questionString(question: string) {
    return (await rd.question(question)).trim();
}

export function closeRD(){
    rd.close();
}
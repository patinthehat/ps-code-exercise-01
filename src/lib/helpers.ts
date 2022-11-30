import { StringStatistics } from '@/types/StringStatistics';
import { readFileSync } from 'fs';

export const readTextFile = (path: string): string => readFileSync(path, { encoding: 'utf8' });

export const readTextFileLines = (path: string): string[] =>
    readTextFile(path)
        .trim()
        .split(/\n/)
        .filter(line => line.trim().length > 0);

export const calculateStringStatistics = (str: string): StringStatistics => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const vowels = 'aeiou'.split('');
    const consonants = alphabet.split('').filter(letter => !vowels.includes(letter));

    const result = {
        consonants: str.split('').filter(letter => consonants.includes(letter)).length,
        length: str.length,
        vowels: str.split('').filter(letter => vowels.includes(letter)).length,
    };

    return result;
};

export const normalizeStreetAddress = (address: string): string => {
    return address
        .replace(/ Ave\./i, ' Avenue')
        .replace(/ Blvd\./i, ' Boulevard')
        .replace(/ Cir\./i, ' Circle')
        .replace(/ Ct\./i, ' Court')
        .replace(/ Dr\./i, ' Drive')
        .replace(/ Hwy\./i, ' Highway')
        .replace(/ Ln\./i, ' Lane')
        .replace(/ Pkwy\./i, ' Parkway')
        .replace(/ Pl\./i, ' Place')
        .replace(/ Rd\./i, ' Road')
        .replace(/ St\./i, ' Street');
};

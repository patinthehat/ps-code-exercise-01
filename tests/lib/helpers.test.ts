import { calculateStringStatistics, normalizeStreetAddress, readTextFileLines } from '@/lib/helpers';

it('calculates the correct number of vowels in a string', () => {
    expect(calculateStringStatistics('hello').vowels).toBe(2);
});

it('calculates the correct number of consonants in a string', () => {
    expect(calculateStringStatistics('hello').consonants).toBe(3);
});

it('calculates the correct number of vowels + consonants in a string', () => {
    const stats = calculateStringStatistics('hello');
    expect(stats.consonants + stats.vowels).toBe(5);
});

it('calculates the correct length of a string', () => {
    expect(calculateStringStatistics('hello').length).toBe(5);
});

it('reads the correct number of lines from a text file', () => {
    expect(readTextFileLines(`${__dirname}/../fixtures/drivers-01.txt`).length).toBe(15);
});

it('reads the correct contents from a text file', () => {
    expect(readTextFileLines(`${__dirname}/../fixtures/drivers-01.txt`)).toMatchSnapshot();
});

it('normalizes street addresses', () => {
    const addresses = [
        '123 Main St.',
        '123 Main Ave.',
        '1231 Yonge Street',
        '456 West 1st Rd.',
        '9371 Eastwood Avenue'
    ];

    const expectedAddress = [
        '123 Main Street',
        '123 Main Avenue',
        '1231 Yonge Street',
        '456 West 1st Road',
        '9371 Eastwood Avenue'
    ];

    addresses.forEach((address, index) => {
        expect(normalizeStreetAddress(address)).toBe(expectedAddress[index]);
    });
});

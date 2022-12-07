# Platform Science Code Exercise 1

---

## Setup

```bash
npm install
```

## Running the application

To run the default code exercise, run the following command:

```bash
npm run dev
```

This will run the default code exercise with test datasets.

Additionally, there are three commands available:

-   `route-shipments`
-   `best-driver`
-   `top-five`

```bash
# run one of the available commands with the following command:
npm run dev -- [command_name] [addresses_filename] [drivers_filename]
```

The previous command will compile the TypeScript code with `esbuild` and run the application using the provided parameters. Filenames should be absolute file paths.

## Testing

This project uses Jest for unit tests. To run the test suite, run:

```bash
npm run test
```

---

## Credits

-   [Patrick Organ](https://github.com/patinthehat)

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.

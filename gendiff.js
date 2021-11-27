#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();
program.option('-h, --help', 'usage help').parse();

const options = program.opts();
const helpDescription = 'Usage: gendiff [options]\n\nCompares two configuration files and shows a difference.\n\nOptions:\n -V, --version        output the version number\n -h, --help           output usage information';

if (options.help) {
    console.log(helpDescription);
}
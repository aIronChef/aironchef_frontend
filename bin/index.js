#!/usr/bin/env node

const { program } = require('commander');
const createProject = require('../commands/create');
const startReview = require('../commands/startAIReview');
const reviewFile = require('../commands/reviewFile');
const checkFileSize = require('../commands/checkoutFile');
const fileBundle = require('../commands/fileBundle');

program
  .command('create <project-name>')
  .description('Create a new project')
  .action(createProject);

program
  .command('start-review <review-type>')
  .description('Start an AI review session')
  .action(startReview);

program
  .command('review-file <file-path>')
  .description('Review a file using AI')
  .option('-m, --message <message>', 'Message for AI')
  .action(reviewFile);

program
  .command('check-size <file-path>')
  .description('Check the size of a file')
  .action(checkFileSize);

program
  .command('bundle-file <file-name>')
  .description('Get file bundle suggestions from AI')
  .action(fileBundle);

program.parse(process.argv);

# AGENTS.md - API App

## Project Overview

**Chords API** - Express server that serves hard-coded songs data for the Chords application.

## Current Status

✅ **Express Server**: Complete server with hard-coded songs
✅ **Health Check**: Server status endpoint
✅ **Song Endpoints**: Get all songs, get by ID, search functionality

## Tech Stack

- **Runtime**: Node.js with ES modules
- **Framework**: Express.js
- **Data**: Hard-coded songs array

## API Endpoints

### Health Check
```
GET /health
```
Returns server status and basic info.

### Get All Songs
```
GET /songs
```
Returns array of all available songs.

### Get Song by ID
```
GET /songs/:id
```
Returns specific song by ID. Returns 404 if not found.

### Search Songs
```
GET /search?q=query
```
Searches songs by title, artist, or lyrics content.

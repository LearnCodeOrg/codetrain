# Codetrain

An educational browser game engine.

## Game Loop

`start()`: runs once at the start of the game

`update()`: runs once a frame

## Input

`isKeyDown(key)`: returns whether given `key` is pressed

`isKey(key)`: returns whether given `key` was pressed in the last frame

## Object

`move(dir)`: moves object `up`, `down`, `left`, or `right`

## Utility

`range(num)`: returns an array containing numbers up to `num`

`sleep(sec)`: returns a promise expiring in `sec` seconds

## Variables

`mapIndex`: the index on the map of the current working object

`background`: array of background sprite indexes

`objects`: array of object sprite indexes

/**
 * Every scene file, imported for its side effect of registering itself.
 *
 * Kept as a barrel so `DemoImage` has one import and a new trade is one line
 * here. The scenes are split by trade rather than by shape because that is how
 * they get drawn: a set for one business at a time, sharing a palette and a
 * light source, which is what stops the gallery from looking like six stickers
 * from different packs.
 */
import './feed';
import './lawn';
import './barber';
import './salon';
import './bottle';

export {};

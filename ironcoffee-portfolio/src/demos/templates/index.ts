import type { ComponentType } from 'react';
import type { DemoConfig, TemplateName } from '../types';
import Booking from './Booking';
import Food from './Food';
import Professional from './Professional';
import Retail from './Retail';
import Trades from './Trades';
import Venue from './Venue';

/**
 * The only place a template name turns into a component.
 *
 * Adding a template means adding a file and one line here. Adding a *business*
 * should never bring you to this file at all.
 */
export const TEMPLATES: Record<
  TemplateName,
  ComponentType<{ config: DemoConfig }>
> = {
  food: Food,
  retail: Retail,
  booking: Booking,
  professional: Professional,
  trades: Trades,
  venue: Venue,
};

/** Shown on the gallery index so each card can say what it is for. */
export const TEMPLATE_BLURBS: Record<TemplateName, string> = {
  food: 'Menu sections with prices, an ordering call to action, hours and photos.',
  retail: 'A product and stock grid, so people stop phoning to ask what you have in.',
  booking: 'A priced service list, staff bios and a booking button that never scrolls away.',
  professional: 'New client offer, insurance list, team credentials and the questions people hesitate over.',
  trades: 'Service areas, trust badges, finished-job photos and a quote form.',
  venue: 'Scroll-driven animation, a pinned sideways gallery and a season switcher that runs without a line of JavaScript.',
};

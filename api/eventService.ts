import { Colors } from '@/styles';
import {determineEvent, API_BASE_PATH} from './helper';

type ApiEventLocation = {
    term_id: number;
    name: string;
    slug: string;
    term_group: number;
    term_taxonomy_id: number;
    taxonomy: 'calendar_event_location';
    description: string;
    parent: number;
    count: number;
    filter: string; // seems to be always "raw"
    color: string; // hex color #000000 to #ffffff
    priority: string; // A number encoded as a string or empty
};

type ApiCalendarEventLocation = {
    calendar_event_location: number[];
};

type ApiAssemblyEvent = {
    ID: number;
    post_author: string; // seems to be a number
    post_date: string; // local time (UTC+3) YYYY-MM-DD HH:MM:SS
    post_date_gmt: string; // UTC: YYYY-MM-DD HH:MM:SS
    post_content: string;
    post_title: string;
    post_excerpt: string;
    post_status: string; // "published", ?
    comment_status: string; // "closed", ?
    ping_status: string; // "closed", ?
    post_password: string;
    post_name: string;
    to_ping: string;
    pinged: string;
    post_modified: string; // local time (UTC+3) YYYY-MM-DD HH:MM:SS
    post_modified_gmt: string; // UTC: YYYY-MM-DD HH:MM:SS
    post_content_filtered: string;
    post_parent: number;
    guid: string; // url to event (?)
    menu_order: number;
    post_type: 'calendar_event';
    post_mime_type: string;
    comment_count: string; // seems to be a number
    filter: string; // seems to be always "raw"
    starts: string; // date and time in ISO 8601
    ends: string; // date and time in ISO 8601
    stream_urls: string[] | undefined;
    program_id: number;
    program_excerpt: string;
    //taxonomy: Taxonomy,
    locations: ApiCalendarEventLocation;
    thumbnail: string; // url to image
    thumbnail_600_600: string; // url to image
};

/*
 * An Assembly Event
 * @typedef {Object} AssemblyEvent
 * @property {number} id - the event identifier
 * @property {string} title - the event title
 * @property {string} excerpt - the event excerpt
 * @property {Date} start - the event start time and date
 * @property {Date} end - the event end time and date
 * @property {string[]} locations - A list of location names for the event
 * @property {string} thumbnail - an url to the thumbnail for the event
 */

type AssemblyEvent = {
    id: number;
    title: string;
    excerpt: string;
    start: Date;
    end: Date;
    location: string;
    thumbnail: string;
    color: string;
};

const determineEvent = (): string => {
    if (process.env.EXPO_PUBLIC_ENVIRONMENT === 'development') {
        return 'summer23';
    }
    const now = new Date();
    const julyFirst = new Date(now.getFullYear(), 7, 1);
    const shortYear = now.getFullYear().toString().slice(-2);

    if (now >= julyFirst) {
        return 'summer' + shortYear;
    } else {
        return 'winter' + shortYear;
    }
};

const API_BASE_PATH = `https://wp.assembly.org/${determineEvent()}/index.php?rest_route=/api/v1`;

/**
 * This function returns a promise for all AssemblyEvents fetched from the api
 *
 * @returns {Promise<AssemblyEvent[]>}
 */
const getEvents = async (): Promise<AssemblyEvent[]> => {
    try {
        const location_resp = await fetch(API_BASE_PATH + '/event_locations');
        if (!location_resp.ok) return [];
        const locations: ApiEventLocation[] = await location_resp.json();

        const event_resp = await fetch(API_BASE_PATH + '/events');
        if (!event_resp.ok) return [];
        const events: ApiAssemblyEvent[] = await event_resp.json();

        return events.map((event) => {
            let eventLocation = locations.find((location) => {
                return event.locations.calendar_event_location?.includes(location.term_id);
            });
            const a: AssemblyEvent = {
                id: event.ID,
                title: event.post_title,
                excerpt: event.post_excerpt,
                start: new Date(event.starts),
                end: new Date(event.ends),
                location: eventLocation ? eventLocation.name : '',
                thumbnail: event.thumbnail,
                color: eventLocation ? eventLocation.color : Colors.dark.default.primaryContainer,
            };

            return a;
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export { AssemblyEvent, getEvents };

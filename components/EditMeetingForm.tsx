'use client';

import { useActionState } from 'react';
import { updateMeeting, type MeetingFormState } from '@/lib/actions';
import type { SacramentMeeting } from '@/lib/types';

const initialState: MeetingFormState = {
  message: null,
  errors: {},
};

function toInputValue(value: unknown, isDateField = false): string {
  if (value === null || value === undefined) {
    return '';
  }
  if (value instanceof Date) {
    return isDateField
      ? value.toISOString().slice(0, 10)
      : value.toISOString();
  }
  const str = String(value);
  if (isDateField && str.includes('T')) {
    return str.slice(0, 10);
  }
  return str;
}

export function EditMeetingForm({ meeting }: { meeting: SacramentMeeting }) {
  const updateMeetingWithId = updateMeeting.bind(null, meeting.id);
  const [state, formAction, isPending] = useActionState(
    updateMeetingWithId,
    initialState
  );

  const speakersDefault = Array.isArray(meeting.speakers)
    ? meeting.speakers.map((s) => toInputValue(s)).filter(Boolean).join(', ')
    : toInputValue(meeting.speakers);

  return (
    <form action={formAction} noValidate className="space-y-4">
      {state.message && (
        <div role="alert" aria-live="polite" className="rounded border p-3">
          {state.message}
        </div>
      )}

      <div>
        <label htmlFor="edit-date" className="block font-medium">
          Date (YYYY-MM-DD)
        </label>
        <input
          id="edit-date"
          name="date"
          type="date"
          defaultValue={toInputValue(meeting.date, true)}
          aria-describedby="edit-date-error"
          aria-invalid={Boolean(state.errors?.date?.length)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
        <div id="edit-date-error" aria-live="polite" className="mt-1 text-sm">
          {state.errors?.date?.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="edit-meetingType" className="block font-medium">
          Meeting Type
        </label>
        <input
          id="edit-meetingType"
          name="meetingType"
          type="text"
          defaultValue={toInputValue(meeting.meetingType)}
          aria-describedby="edit-meetingType-error"
          aria-invalid={Boolean(state.errors?.meetingType?.length)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
        <div
          id="edit-meetingType-error"
          aria-live="polite"
          className="mt-1 text-sm"
        >
          {state.errors?.meetingType?.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="edit-presiding" className="block font-medium">
          Presiding
        </label>
        <input
          id="edit-presiding"
          name="presiding"
          type="text"
          defaultValue={toInputValue(meeting.presiding)}
          aria-describedby="edit-presiding-error"
          aria-invalid={Boolean(state.errors?.presiding?.length)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
        <div
          id="edit-presiding-error"
          aria-live="polite"
          className="mt-1 text-sm"
        >
          {state.errors?.presiding?.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="edit-conducting" className="block font-medium">
          Conducting
        </label>
        <input
          id="edit-conducting"
          name="conducting"
          type="text"
          defaultValue={toInputValue(meeting.conducting)}
          aria-describedby="edit-conducting-error"
          aria-invalid={Boolean(state.errors?.conducting?.length)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
        <div
          id="edit-conducting-error"
          aria-live="polite"
          className="mt-1 text-sm"
        >
          {state.errors?.conducting?.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="edit-announcements" className="block font-medium">
          Announcements
        </label>
        <textarea
          id="edit-announcements"
          name="announcements"
          defaultValue={toInputValue(meeting.announcements)}
          aria-describedby="edit-announcements-error"
          aria-invalid={Boolean(state.errors?.announcements?.length)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
        <div
          id="edit-announcements-error"
          aria-live="polite"
          className="mt-1 text-sm"
        >
          {state.errors?.announcements?.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="edit-openingHymn" className="block font-medium">
          Opening Hymn
        </label>
        <input
          id="edit-openingHymn"
          name="openingHymn"
          type="text"
          defaultValue={toInputValue(meeting.openingHymn)}
          aria-describedby="edit-openingHymn-error"
          aria-invalid={Boolean(state.errors?.openingHymn?.length)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
        <div
          id="edit-openingHymn-error"
          aria-live="polite"
          className="mt-1 text-sm"
        >
          {state.errors?.openingHymn?.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="edit-openingPrayer" className="block font-medium">
          Opening Prayer
        </label>
        <input
          id="edit-openingPrayer"
          name="openingPrayer"
          type="text"
          defaultValue={toInputValue(meeting.openingPrayer)}
          aria-describedby="edit-openingPrayer-error"
          aria-invalid={Boolean(state.errors?.openingPrayer?.length)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
        <div
          id="edit-openingPrayer-error"
          aria-live="polite"
          className="mt-1 text-sm"
        >
          {state.errors?.openingPrayer?.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="edit-wardBusiness" className="block font-medium">
          Ward Business
        </label>
        <input
          id="edit-wardBusiness"
          name="wardBusiness"
          type="text"
          defaultValue={toInputValue(meeting.wardBusiness)}
          aria-describedby="edit-wardBusiness-error"
          aria-invalid={Boolean(state.errors?.wardBusiness?.length)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
        <div
          id="edit-wardBusiness-error"
          aria-live="polite"
          className="mt-1 text-sm"
        >
          {state.errors?.wardBusiness?.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="edit-stakeBusiness" className="block font-medium">
          Stake Business
        </label>
        <input
          id="edit-stakeBusiness"
          name="stakeBusiness"
          type="text"
          defaultValue={toInputValue(meeting.stakeBusiness)}
          aria-describedby="edit-stakeBusiness-error"
          aria-invalid={Boolean(state.errors?.stakeBusiness?.length)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
        <div
          id="edit-stakeBusiness-error"
          aria-live="polite"
          className="mt-1 text-sm"
        >
          {state.errors?.stakeBusiness?.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="edit-sacramentHymn" className="block font-medium">
          Sacrament Hymn
        </label>
        <input
          id="edit-sacramentHymn"
          name="sacramentHymn"
          type="text"
          defaultValue={toInputValue(meeting.sacramentHymn)}
          aria-describedby="edit-sacramentHymn-error"
          aria-invalid={Boolean(state.errors?.sacramentHymn?.length)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
        <div
          id="edit-sacramentHymn-error"
          aria-live="polite"
          className="mt-1 text-sm"
        >
          {state.errors?.sacramentHymn?.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="edit-speakers" className="block font-medium">
          Speakers (comma-separated)
        </label>
        <input
          id="edit-speakers"
          name="speakers"
          type="text"
          defaultValue={speakersDefault}
          aria-describedby="edit-speakers-error"
          aria-invalid={Boolean(state.errors?.speakers?.length)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
        <div
          id="edit-speakers-error"
          aria-live="polite"
          className="mt-1 text-sm"
        >
          {state.errors?.speakers?.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="edit-closingHymn" className="block font-medium">
          Closing Hymn
        </label>
        <input
          id="edit-closingHymn"
          name="closingHymn"
          type="text"
          defaultValue={toInputValue(meeting.closingHymn)}
          aria-describedby="edit-closingHymn-error"
          aria-invalid={Boolean(state.errors?.closingHymn?.length)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
        <div
          id="edit-closingHymn-error"
          aria-live="polite"
          className="mt-1 text-sm"
        >
          {state.errors?.closingHymn?.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="edit-closingPrayer" className="block font-medium">
          Closing Prayer
        </label>
        <input
          id="edit-closingPrayer"
          name="closingPrayer"
          type="text"
          defaultValue={toInputValue(meeting.closingPrayer)}
          aria-describedby="edit-closingPrayer-error"
          aria-invalid={Boolean(state.errors?.closingPrayer?.length)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
        <div
          id="edit-closingPrayer-error"
          aria-live="polite"
          className="mt-1 text-sm"
        >
          {state.errors?.closingPrayer?.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded border px-4 py-2 font-medium"
      >
        {isPending ? 'Updating...' : 'Update Meeting'}
      </button>
    </form>
  );
}
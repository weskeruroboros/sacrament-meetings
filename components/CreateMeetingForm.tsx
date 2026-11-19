'use client';

import { useActionState } from 'react';
import { createMeeting, type MeetingFormState } from '@/lib/actions';

const initialState: MeetingFormState = {
  message: null,
  errors: {},
};

export function CreateMeetingForm() {
  const [state, formAction, isPending] = useActionState(
    createMeeting,
    initialState
  );

  return (
    <form action={formAction} noValidate className="space-y-4">
      {state.message && (
        <div role="alert" aria-live="polite" className="rounded border p-3">
          {state.message}
        </div>
      )}

      <div>
        <label htmlFor="create-date" className="block font-medium">
          Date (YYYY-MM-DD)
        </label>
        <input
          id="create-date"
          name="date"
          type="date"
          aria-describedby="create-date-error"
          aria-invalid={Boolean(state.errors?.date?.length)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
        <div id="create-date-error" aria-live="polite" className="mt-1 text-sm">
          {state.errors?.date?.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="create-meetingType" className="block font-medium">
          Meeting Type
        </label>
        <input
          id="create-meetingType"
          name="meetingType"
          type="text"
          aria-describedby="create-meetingType-error"
          aria-invalid={Boolean(state.errors?.meetingType?.length)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
        <div
          id="create-meetingType-error"
          aria-live="polite"
          className="mt-1 text-sm"
        >
          {state.errors?.meetingType?.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="create-presiding" className="block font-medium">
          Presiding
        </label>
        <input
          id="create-presiding"
          name="presiding"
          type="text"
          aria-describedby="create-presiding-error"
          aria-invalid={Boolean(state.errors?.presiding?.length)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
        <div
          id="create-presiding-error"
          aria-live="polite"
          className="mt-1 text-sm"
        >
          {state.errors?.presiding?.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="create-conducting" className="block font-medium">
          Conducting
        </label>
        <input
          id="create-conducting"
          name="conducting"
          type="text"
          aria-describedby="create-conducting-error"
          aria-invalid={Boolean(state.errors?.conducting?.length)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
        <div
          id="create-conducting-error"
          aria-live="polite"
          className="mt-1 text-sm"
        >
          {state.errors?.conducting?.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="create-announcements" className="block font-medium">
          Announcements
        </label>
        <textarea
          id="create-announcements"
          name="announcements"
          aria-describedby="create-announcements-error"
          aria-invalid={Boolean(state.errors?.announcements?.length)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
        <div
          id="create-announcements-error"
          aria-live="polite"
          className="mt-1 text-sm"
        >
          {state.errors?.announcements?.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="create-openingHymn" className="block font-medium">
          Opening Hymn
        </label>
        <input
          id="create-openingHymn"
          name="openingHymn"
          type="text"
          aria-describedby="create-openingHymn-error"
          aria-invalid={Boolean(state.errors?.openingHymn?.length)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
        <div
          id="create-openingHymn-error"
          aria-live="polite"
          className="mt-1 text-sm"
        >
          {state.errors?.openingHymn?.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="create-openingPrayer" className="block font-medium">
          Opening Prayer
        </label>
        <input
          id="create-openingPrayer"
          name="openingPrayer"
          type="text"
          aria-describedby="create-openingPrayer-error"
          aria-invalid={Boolean(state.errors?.openingPrayer?.length)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
        <div
          id="create-openingPrayer-error"
          aria-live="polite"
          className="mt-1 text-sm"
        >
          {state.errors?.openingPrayer?.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="create-wardBusiness" className="block font-medium">
          Ward Business
        </label>
        <input
          id="create-wardBusiness"
          name="wardBusiness"
          type="text"
          aria-describedby="create-wardBusiness-error"
          aria-invalid={Boolean(state.errors?.wardBusiness?.length)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
        <div
          id="create-wardBusiness-error"
          aria-live="polite"
          className="mt-1 text-sm"
        >
          {state.errors?.wardBusiness?.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="create-stakeBusiness" className="block font-medium">
          Stake Business
        </label>
        <input
          id="create-stakeBusiness"
          name="stakeBusiness"
          type="text"
          aria-describedby="create-stakeBusiness-error"
          aria-invalid={Boolean(state.errors?.stakeBusiness?.length)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
        <div
          id="create-stakeBusiness-error"
          aria-live="polite"
          className="mt-1 text-sm"
        >
          {state.errors?.stakeBusiness?.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="create-sacramentHymn" className="block font-medium">
          Sacrament Hymn
        </label>
        <input
          id="create-sacramentHymn"
          name="sacramentHymn"
          type="text"
          aria-describedby="create-sacramentHymn-error"
          aria-invalid={Boolean(state.errors?.sacramentHymn?.length)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
        <div
          id="create-sacramentHymn-error"
          aria-live="polite"
          className="mt-1 text-sm"
        >
          {state.errors?.sacramentHymn?.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="create-speakers" className="block font-medium">
          Speakers (comma-separated)
        </label>
        <input
          id="create-speakers"
          name="speakers"
          type="text"
          aria-describedby="create-speakers-error"
          aria-invalid={Boolean(state.errors?.speakers?.length)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
        <div
          id="create-speakers-error"
          aria-live="polite"
          className="mt-1 text-sm"
        >
          {state.errors?.speakers?.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="create-closingHymn" className="block font-medium">
          Closing Hymn
        </label>
        <input
          id="create-closingHymn"
          name="closingHymn"
          type="text"
          aria-describedby="create-closingHymn-error"
          aria-invalid={Boolean(state.errors?.closingHymn?.length)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
        <div
          id="create-closingHymn-error"
          aria-live="polite"
          className="mt-1 text-sm"
        >
          {state.errors?.closingHymn?.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="create-closingPrayer" className="block font-medium">
          Closing Prayer
        </label>
        <input
          id="create-closingPrayer"
          name="closingPrayer"
          type="text"
          aria-describedby="create-closingPrayer-error"
          aria-invalid={Boolean(state.errors?.closingPrayer?.length)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
        <div
          id="create-closingPrayer-error"
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
        {isPending ? 'Saving...' : 'Create Meeting'}
      </button>
    </form>
  );
}
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import type { SacramentMeeting } from './types';
import {
  addMeeting,
  deleteMeeting as deleteMeetingFromDb,
  updateMeeting as updateMeetingInDb,
} from './meetings-db';

export type MeetingFieldErrors = {
  date?: string[];
  meetingType?: string[];
  presiding?: string[];
  conducting?: string[];
  announcements?: string[];
  openingHymn?: string[];
  openingPrayer?: string[];
  wardBusiness?: string[];
  stakeBusiness?: string[];
  sacramentHymn?: string[];
  speakers?: string[];
  closingHymn?: string[];
  closingPrayer?: string[];
};

export type MeetingFormState = {
  message?: string | null;
  errors?: MeetingFieldErrors;
};

const MeetingFormSchema = z.object({
  date: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Please enter a valid date (YYYY-MM-DD).'),
  meetingType: z.string().trim().min(1, 'Meeting type is required.'),
  presiding: z.string().trim().min(1, 'Presiding leader is required.'),
  conducting: z.string().trim().min(1, 'Conducting leader is required.'),
  announcements: z.string().trim().default(''),
  openingHymn: z.string().trim().default(''),
  openingPrayer: z.string().trim().default(''),
  wardBusiness: z.string().trim().default(''),
  stakeBusiness: z.string().trim().default(''),
  sacramentHymn: z.string().trim().default(''),
  speakers: z
    .string()
    .trim()
    .default('')
    .transform((val) =>
      val
        ? val
            .split(',')
            .map((speaker) => speaker.trim())
            .filter(Boolean)
        : []
    ),
  closingHymn: z.string().trim().default(''),
  closingPrayer: z.string().trim().default(''),
});

function getFieldString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === 'string' ? value : '';
}

function extractFormInput(formData: FormData) {
  return {
    date: getFieldString(formData, 'date'),
    meetingType: getFieldString(formData, 'meetingType'),
    presiding: getFieldString(formData, 'presiding'),
    conducting: getFieldString(formData, 'conducting'),
    announcements: getFieldString(formData, 'announcements'),
    openingHymn: getFieldString(formData, 'openingHymn'),
    openingPrayer: getFieldString(formData, 'openingPrayer'),
    wardBusiness: getFieldString(formData, 'wardBusiness'),
    stakeBusiness: getFieldString(formData, 'stakeBusiness'),
    sacramentHymn: getFieldString(formData, 'sacramentHymn'),
    speakers: getFieldString(formData, 'speakers'),
    closingHymn: getFieldString(formData, 'closingHymn'),
    closingPrayer: getFieldString(formData, 'closingPrayer'),
  };
}

function mapZodFieldErrors(
  fieldErrors: Record<string, string[] | undefined>
): MeetingFieldErrors {
  return {
    date: fieldErrors.date,
    meetingType: fieldErrors.meetingType,
    presiding: fieldErrors.presiding,
    conducting: fieldErrors.conducting,
    announcements: fieldErrors.announcements,
    openingHymn: fieldErrors.openingHymn,
    openingPrayer: fieldErrors.openingPrayer,
    wardBusiness: fieldErrors.wardBusiness,
    stakeBusiness: fieldErrors.stakeBusiness,
    sacramentHymn: fieldErrors.sacramentHymn,
    speakers: fieldErrors.speakers,
    closingHymn: fieldErrors.closingHymn,
    closingPrayer: fieldErrors.closingPrayer,
  };
}

function toMeetingInput(
  data: z.infer<typeof MeetingFormSchema>
): Omit<SacramentMeeting, 'id'> {
  return {
    ...(data as unknown as Omit<SacramentMeeting, 'id'>),
    speakers: data.speakers as unknown as SacramentMeeting['speakers'],
  };
}

export async function createMeeting(
  _prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  const parsed = MeetingFormSchema.safeParse(extractFormInput(formData));

  if (!parsed.success) {
    return {
      message: 'Please fix the errors below before saving.',
      errors: mapZodFieldErrors(parsed.error.flatten().fieldErrors),
    };
  }

  try {
    await addMeeting(toMeetingInput(parsed.data));
  } catch (error) {
    console.error('Error creating meeting:', error);
    throw new Error('Unable to create the meeting right now. Please try again.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  _prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  if (!Number.isInteger(id) || id <= 0) {
    return {
      message: 'Invalid meeting ID.',
      errors: {},
    };
  }

  const parsed = MeetingFormSchema.safeParse(extractFormInput(formData));

  if (!parsed.success) {
    return {
      message: 'Please fix the errors below before updating.',
      errors: mapZodFieldErrors(parsed.error.flatten().fieldErrors),
    };
  }

  try {
    const updated = await updateMeetingInDb(id, toMeetingInput(parsed.data));
    if (!updated) {
      throw new Error(`Meeting with id ${id} was not found for update.`);
    }
  } catch (error) {
    console.error(`Error updating meeting ${id}:`, error);
    throw new Error('Unable to update the meeting right now. Please try again.');
  }

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}/edit`);
  redirect('/meetings');
}

export async function deleteMeeting(id: number): Promise<void> {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error('Invalid meeting ID.');
  }

  try {
    await deleteMeetingFromDb(id);
  } catch (error) {
    console.error(`Error deleting meeting ${id}:`, error);
    throw new Error('Unable to delete the meeting right now. Please try again.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}
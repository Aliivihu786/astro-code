// In its own file to avoid circular dependencies
export const FILE_EDIT_TOOL_NAME = 'Edit'

// Permission pattern for granting session-level access to the project's .astro/ folder
export const ASTRO_FOLDER_PERMISSION_PATTERN = '/.astro/**'

// Permission pattern for granting session-level access to the global ~/.astro/ folder
export const GLOBAL_ASTRO_FOLDER_PERMISSION_PATTERN = '~/.astro/**'

export const FILE_UNEXPECTEDLY_MODIFIED_ERROR =
  'File has been unexpectedly modified. Read it again before attempting to write it.'

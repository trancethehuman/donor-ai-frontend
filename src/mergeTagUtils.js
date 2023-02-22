/**
 * It takes a string and an object of available merge tags, and returns an array of valid merge tags
 * found in the string
 * @param inputString - The string that you want to search for merge tags
 * @param availableMergeTags - {
 * @returns An array of merge tags that are found in the input string.
 */
export const getMergeTags = (inputString, availableMergeTags) => {
  const mergeTags = [];
  let index = 0;

  while (index < inputString.length) {
    // Find the next occurrence of the merge tag opener
    const openerStartIndex = inputString.indexOf("*|", index);

    // If no more merge tags are found, break out of the loop
    if (openerStartIndex === -1) {
      break;
    }

    const openerEndIndex = openerStartIndex + 2;

    // Find the corresponding merge tag closer
    const closerStartIndex = openerEndIndex;
    const closerEndIndex = inputString.indexOf("|*", closerStartIndex);

    // If no matching closer is found, break out of the loop
    if (closerEndIndex === -1) {
      break;
    }

    // Extract the merge tag and add it to the array
    const mergeTag = inputString.slice(openerStartIndex, closerEndIndex + 2);
    mergeTags.push(mergeTag);

    // Move the index to the end of the current merge tag
    index = closerEndIndex + 2;
  }

  // Filter out any merge tags that are not available
  const availableMergeTagValues = Object.values(availableMergeTags);
  const validMergeTags = mergeTags.filter((tag) =>
    availableMergeTagValues.includes(tag)
  );

  return validMergeTags;
};

/**
 * It takes an array of merge tag names and an object of available merge tags and returns an array of
 * merge tag keys.
 * @param mergeTagValues
 * @param availableMergeTags
 * @returns An array of keys from the official hash table of merge tags.
 */
export const getMergeTagKeysFromTagNames = (
  mergeTagValues,
  availableMergeTags
) => {
  const mergeTagKeys = [];
  for (const [key, value] of Object.entries(availableMergeTags)) {
    if (mergeTagValues.includes(value)) {
      mergeTagKeys.push(key);
    }
  }
  return mergeTagKeys;
};

/**
 * It takes a string and an array of official tags, and returns an array of tag keys.
 * @param inputString - "This is an email for somebody, with merge tags in it"
 * @param availableMergeTags -
 * @returns An array of objects.
 */
export const getTags = (inputString, availableMergeTags) => {
  const tagNames = getMergeTags(inputString, availableMergeTags);
  return getMergeTagKeysFromTagNames(tagNames, availableMergeTags);
};

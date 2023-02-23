/**
 * It takes a string and an object of available merge tags, and returns an array of valid merge tags
 * found in the string
 * @param inputString - The string that you want to search for merge tags
 * @param availableMergeTags - {
 * @returns An array of merge tags that are found in the input string.
 */
export const getMergeTags = (inputString, availableMergeTags) => {
  const mergeTags = [];
  const tags = Object.values(availableMergeTags).map((tag) => tag.name);
  for (let i = 0; i < inputString.length; i++) {
    for (let j = 0; j < tags.length; j++) {
      if (inputString.substring(i, i + tags[j].length) === tags[j]) {
        mergeTags.push(tags[j]);
        i += tags[j].length - 1;
        break;
      }
    }
  }
  return mergeTags;
};

/**
 * It takes an array of merge tag names and an object of available merge tags and returns an array of
 * merge tag keys.
 * @param mergeTagValues
 * @param availableMergeTags
 * @returns An array of keys from the official hash table of merge tags.
 */
export const getTagKeysFromTagNames = (mergeTagValues, availableMergeTags) => {
  const foundKeys = [];
  for (const [key, value] of Object.entries(availableMergeTags)) {
    if (mergeTagValues.includes(value.name)) {
      foundKeys.push(key);
    }
  }
  return foundKeys;
};

/**
 * It takes a string and an array of official tags, and returns an array of tag keys.
 * @param inputString - "This is an email for somebody, with merge tags in it"
 * @param availableMergeTags -
 * @returns An array of objects.
 */
export const getTagKeysFromString = (inputString, availableMergeTags) => {
  const tagNames = getMergeTags(inputString, availableMergeTags);
  return getTagKeysFromTagNames(tagNames, availableMergeTags);
};

/**
 * It takes an array of objects, each object having a tag and column_headers property, and returns an
 * array of column_headers that match the tagName passed in
 * @param columnHeadersAndTagNames - [{tag: "tag1", column_headers: ["header1", "header2"]}, {tag:
 * "tag2", column_headers: ["header3", "header4"]}]
 * @param tagName - "tag1"
 * @returns An array of column headers.
 */
export const getColumnHeadersByTag = (columnHeadersAndTagNames, tagName) => {
  const headers = columnHeadersAndTagNames
    .filter((entry) => entry.tag === tagName)
    .map((entry) => entry.column_headers);

  return headers.flat();
};

export const getTagKeysAndChosenColumns = (tagKeys, chosenColumnHeaders) => {
  const result = tagKeys.map((tagKey) => {
    return {
      tag: tagKey,
      column_headers: getColumnHeadersByTag(chosenColumnHeaders, tagKey),
    };
  });

  return result;
};

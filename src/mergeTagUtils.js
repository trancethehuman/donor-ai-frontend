import { Endpoints } from "./consts";
import { removeBeginningDotFromString } from "./utils";

/**
 * It takes a string and an object of available merge tags, and returns an array of valid merge tags
 * found in the string
 * @param inputString - The string that you want to search for merge tags
 * @param availableMergeTags - {
 * @returns An array of merge tags that are found in the input string.
 */
export const getTagNamesFromString = (inputString, availableMergeTags) => {
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
  const tagNames = getTagNamesFromString(inputString, availableMergeTags);
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
export const getColumnHeadersByTagKeys = (
  columnHeadersAndTagNames,
  tagKey,
  AllTagReferences
) => {
  const headers = columnHeadersAndTagNames
    .filter((entry) => entry.name === AllTagReferences[tagKey].name)
    .map((entry) => entry.column_headers);

  return headers.flat()[0];
};

/**
 * It takes an array of tag keys and an array of column headers and returns an array of objects with
 * the tag key and the column headers that match that tag key
 * @param tagKeys - ["tag1", "tag2", "tag3"]
 * @param chosenColumnHeaders - [{tag: 'tag1', column_headers: ['column1', 'column2']}, {tag: 'tag2',
 * column_headers: ['column3', 'column4']}]
 * @returns An array of objects.
 */
export const getTagKeysAndChosenColumnHeaders = (
  tagKeys,
  chosenColumnHeaders,
  AllTagReferences
) => {
  const result = tagKeys.map((tagKey) => {
    return {
      tag: tagKey,
      column_headers: getColumnHeadersByTagKeys(
        chosenColumnHeaders,
        tagKey,
        AllTagReferences
      ),
    };
  });

  return result;
};

export const fetchAiContent = async () => {
  const requestBody = {
    city: "New York",
  };

  try {
    const result = await fetch(Endpoints.BODY_LOCATION_OPENER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    return await result.json();
  } catch (e) {}
};

/**
 * It takes a spreadsheetData array of objects and a tagKeysAndColumns array of objects and returns a
 * new array of objects with the same data as the spreadsheetData array but with the addition of new
 * properties and values from the tagKeysAndColumns array
 * @param spreadsheetData - [{}, {}, {}]
 * @param tagKeysAndColumns - [{tag: 'tag1', column: 'column1'}, {tag: 'tag2', column: 'column2'}]
 * @returns Nothing.
 */
export const SetDataToRowsByTagsWithColumns = async (
  spreadsheetData,
  tagKeysAndColumns
) => {
  if (spreadsheetData) {
    return Promise.all(
      spreadsheetData.map(async (row) => {
        const newRow = { ...row }; // Make a copy of the current row, otherwise the lines below directly changes the source spreadSheetData

        await Promise.all(
          tagKeysAndColumns.map(async (tag) => {
            const aiResult = await fetchAiContent();
            const result = await aiResult?.choices[0].text;
            newRow[tag.tag] = removeBeginningDotFromString(result);
            console.log(tag);
          })
        );
        return newRow;
      })
    );
  }
};

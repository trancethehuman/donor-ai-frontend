import {
  removeBeginningDotFromString,
  replaceIdentifyingString,
} from "./utils";
import { Endpoints } from "./consts";
import { AllTagReferences } from "./consts";

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

/**
 * It takes a tag, finds the tag reference, finds the endpoint, and returns the endpoint.
 * @param tag - The tag you want to get the endpoint for.
 * @returns The function getEndpointByTag is being returned.
 */
export const getEndpointByTag = (tag) => {
  const endpoint = Endpoints[tag];
  if (!endpoint) {
    throw new Error(`Endpoint for tag '${tag}' not found in Endpoints`);
  }
  return endpoint;
};

/**
 * It takes a reference object and a data object as arguments, and returns a new object that contains
 * the values of the data object's keys that match the locations in the reference object's
 * column_headers.locations array, as well as the tag property from the reference object.
 * @param reference - {
 * @param data - {
 * @returns An object with the following properties:
 *
 * {
 *   "tag": "tag1",
 *   "location1": "value1",
 *   "location2": "value2",
 *   "location3": "value3"
 * }</code>
 */
export const generateRequestBody = (tagAndColumns, rowData) => {
  const result = {
    tag: tagAndColumns.tag,
  };

  const columnHeaders = tagAndColumns.column_headers;

  Object.keys(columnHeaders).map((header) => {
    result[header] = rowData[columnHeaders[header]];
  });

  return result;
};

/**
 * It takes in a URL, a list of tags and columns, and a data row, and returns the result of a POST
 * request to the URL with the data row as the body
 * @param endpoint - the endpoint to send the request to
 * @param tagAndColumns -
 * @param dataRow -
 * @returns The result of the fetch call.
 */
export const fetchAiContent = async (endpoint, tagAndColumns, dataRow) => {
  const requestBody = generateRequestBody(tagAndColumns, dataRow);

  try {
    const result = await fetch(endpoint, {
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
export const updateDataWithGeneratedContent = async (
  spreadsheetData,
  tagKeysAndColumns
) => {
  if (spreadsheetData) {
    return Promise.all(
      spreadsheetData.map(async (row) => {
        const newRow = { ...row }; // Make a copy of the current row, otherwise the lines below directly changes the source spreadSheetData

        await Promise.all(
          tagKeysAndColumns.map(async (tag) => {
            const endpoint = getEndpointByTag(tag.tag);
            const aiResult = await fetchAiContent(endpoint, tag, newRow);
            const result = await aiResult?.choices[0].text;
            newRow[tag.tag] = removeBeginningDotFromString(result);
          })
        );
        return newRow;
      })
    );
  }
};

export const putStringInsideTagIdentifiers = (
  content,
  openingTag,
  closingTag
) => {
  return `${openingTag}${content}${closingTag}`;
};

export const replaceTagNamesWithRowData = (
  inputString,
  tagReferences = AllTagReferences,
  rowData,
  openingTag,
  closingTag
) => {
  let newString = "";

  const tagKeys = getTagKeysFromString(inputString, tagReferences);

  tagKeys.map((tagKey) => {
    const tagName = tagReferences[tagKey].name;
    const tagNameWithIdentifiers = putStringInsideTagIdentifiers(
      tagName,
      openingTag,
      closingTag
    );
    const rowDataFromTag = rowData[tagKey];
    newString = replaceIdentifyingString(
      inputString,
      tagNameWithIdentifiers,
      rowDataFromTag
    );
  });

  return newString;
};

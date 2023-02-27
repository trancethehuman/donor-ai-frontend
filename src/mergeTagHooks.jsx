import { useState, useEffect, useCallback } from "react";
import { removeBeginningDotFromString } from "./utils";

export const useGenerateAiContent = (
  spreadsheetOneData,
  tagKeysAndColumns,
  endpoint
) => {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateAiContent = useCallback(async () => {
    try {
      setLoading(true);

      const newData = await Promise.all(
        spreadsheetOneData.map(async (row) => {
          const newRow = { ...row };

          await Promise.all(
            tagKeysAndColumns.map(async (tag) => {
              const aiResult = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
              });

              const aiResultJson = await aiResult.json();
              const result = aiResultJson?.choices[0]?.text;
              newRow[tag.tag] = removeBeginningDotFromString(result);
            })
          );

          return newRow;
        })
      );

      setResult(newData);
      setLoading(false);
      setError(null);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [endpoint, spreadsheetOneData, tagKeysAndColumns]);

  useEffect(() => {
    generateAiContent();
  }, [generateAiContent]);

  return [result, loading, error];
};

import {
  makeStyles,
  shorthands,
  Button,
  Caption1,
  Text,
  tokens,
  Subtitle1,
  Body1,
} from "@fluentui/react-components";
import { Card, CardHeader } from "@fluentui/react-components/unstable";
import * as React from "react";

import { MoreHorizontal20Filled } from "@fluentui/react-icons";

const useStyles = makeStyles({
  main: {
    ...shorthands.gap("36px"),
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
  },

  card: {
    width: "360px",
    maxWidth: "100%",
    height: "fit-content",
  },

  section: {
    width: "fit-content",
  },

  title: {
    ...shorthands.margin(0, 0, "12px"),
  },

  horizontalCardImage: {
    width: "64px",
    height: "64px",
  },

  headerImage: {
    ...shorthands.borderRadius("4px"),
    maxWidth: "42px",
    maxHeight: "42px",
  },

  caption: {
    color: tokens.colorNeutralForeground3,
  },

  text: {
    ...shorthands.margin(0),
  },
});

const CardWrapper = ({
  image = null,
  title = "",
  subtitle = "",
  bodyText = "",
}) => {
  const styles = useStyles();

  return (
    <div className={styles.main}>
      <section className={styles.section}>
        <Card className={styles.card}>
          <CardHeader
            image={
              image && (
                <img className={styles.headerImage} src={image} alt="image" />
              )
            }
            header={<Body1>{title}</Body1>}
            description={
              <Caption1 className={styles.caption}>{subtitle}</Caption1>
            }
            action={
              <Button
                appearance="transparent"
                icon={<MoreHorizontal20Filled />}
                aria-label="More options"
              />
            }
          />

          <p className={styles.text}>{bodyText}</p>
        </Card>
      </section>
    </div>
  );
};

export default CardWrapper;

import { FC } from "react";
import { Card, CardContent, Typography, CardMedia } from "@material-ui/core"

import { IContact } from "../../model/contact.interface";
import classes from "./ContactCard.module.css";

interface IContactCardProps {
  contact: IContact
}

const ContactCard: FC<IContactCardProps> = ({ contact }) => {
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={contact.picture}
        title={contact.name}
      />
      <CardContent className={classes.content}>
        <Typography component="h5" variant="h5">
          {contact.name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {contact.country}
        </Typography>
      </CardContent>

    </Card>)
}

export default ContactCard;
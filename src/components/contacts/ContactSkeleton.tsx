import { Card, CardContent } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import classes from "./ContactCard.module.css";

const ContactSkeleton = () => {
  return (
    <Card className={classes.root}>
      <Skeleton variant="rect" className={classes.cover} style={{ height: '100%' }} />
      <CardContent className={classes.content}>
        <Skeleton variant="text" />
      </CardContent>

    </Card>
  );
}
export default ContactSkeleton;
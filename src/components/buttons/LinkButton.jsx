import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LinkButton = (props) => {
    return (
        <Button variant={props.variant} className={props.buttonStyle} size='sm' asChild>
          <Link
            to={props.href}
            style={{ textDecoration: "none" }}
            label={props.hrefLabel}
          >
            {props.buttonLabel}
          </Link>
        </Button>
    );
}

export default LinkButton;
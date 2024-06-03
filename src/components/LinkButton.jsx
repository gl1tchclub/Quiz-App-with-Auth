import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LinkButton = (props) => {
    return (
        <Button variant={props.buttonVariant} className="font-normal w-full" size='sm' asChild>
          <Link
            to={props.buttonHref}
            style={{ color: "black", textDecoration: "none" }}
            label={props.buttonLabel}
          >
            {props.buttonLabel}
          </Link>
        </Button>
    );
}

export default LinkButton;
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LinkButton = (props) => {
    return (
        <Button variant={props.variant} className="font-normal w-full" size='sm' asChild>
          <Link
            to={props.href}
            style={{ color: "black", textDecoration: "none" }}
            label={props.hrefLabel}
          >
            {props.buttonLabel}
          </Link>
        </Button>
    );
}

export default LinkButton;
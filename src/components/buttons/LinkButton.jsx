/**
 * @file LinkButton.jsx
 * @module LinkButton
 * @description Button component that renders a link using React Router's Link component.
 * @author Elizabeth Minty
 */

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

/**
 * LinkButton component renders a button that acts as a link using React Router's Link component.
 * @param {Object} props - Component props.
 * @returns {JSX.Element} Rendered component with a link button.
 */
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
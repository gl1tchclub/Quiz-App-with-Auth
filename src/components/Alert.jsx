/**
 * @file AlertComponent.jsx
 * @module components/AlertComponent
 * @description Component for displaying different types of alerts with icons.
 * @author Your Name
 */

import { ExclamationTriangleIcon, RocketIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

/**
 * Functional component for rendering an alert with an icon based on type.
 * @param {Object} props - Component props containing type, title, description, and style.
 * @returns {JSX.Element} Rendered AlertComponent.
 */
const AlertComponent = (props) => {
  return (
    <Alert className={props.style}>
      {props.type == "error" ? (
        <ExclamationTriangleIcon className="h-4 w-4" />
      ) : (
        <RocketIcon className="h-4 w-4" />
      )}
      <AlertTitle>{props.title}</AlertTitle>
      <AlertDescription>{props.desc}</AlertDescription>
    </Alert>
  );
}

/**
 * ErrorAlert component that displays an error alert using AlertComponent.
 * @param {Object} props - Component props containing description.
 * @returns {JSX.Element} Rendered ErrorAlert.
 */
const ErrorAlert = (props) => {
  return (
    <AlertComponent
      type="error"
      title="Error"
      desc={props.desc}
      style="border-2 border-pink-700 w-1/3 bg-transparent shadow-xl mt-10 text-pink-800 [&>svg]:text-pink-800 [&>svg]:size-7"
    />
  );
}
export { AlertComponent, ErrorAlert }
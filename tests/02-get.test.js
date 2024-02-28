/**
 * @file Tests GET for each table using seeded data
 * @author Elizabeth Minty
 */
import chai from "chai";
import chaiHttp from "chai-http";

//assertion
import { describe, it } from "mocha";
import app from "../index.js";
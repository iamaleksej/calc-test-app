import React from "react";
import hhService from "../..";

const {
	Provider: HhServiceProvider,
	Consumer: HhServiceConsumer
} = React.createContext<any>(null);

export {
	HhServiceProvider,
	HhServiceConsumer
}
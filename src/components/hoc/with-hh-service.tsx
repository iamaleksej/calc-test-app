import React from "react";
import { HhServiceConsumer } from "../hh-service-context";

const withHhService = () => (Wrapped: any) => {

	return (props: any) => {
		return (
			<HhServiceConsumer>
				{
					(hhService) => {
						return (<Wrapped {...props} hhService={hhService} />);
					}
				}
			</HhServiceConsumer>
		)
	}
}

export default withHhService;
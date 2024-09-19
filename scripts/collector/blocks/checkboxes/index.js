// Import Material-UI UMD
const MUI = window["material-ui"];

@TripettoCollector.node("tripetto-block-checkboxes")
class Checkboxes extends TripettoCollector.NodeBlock {
    OnRender(instance) {
        return (
            <MUI.Paper elevation={1} style={{ padding: "8px 24px 8px" }}>
                {this.Node.Props.NameVisible &&
                    this.Node.Props.Name && (
                        <MUI.Typography variant="headline" color="inherit" style={{ paddingTop: "8px" }}>
                            {this.Node.Props.Name}
                        </MUI.Typography>
                    )}

                {this.Node.Props.Description && (
                    <MUI.Typography variant="subheading" color="inherit" style={{ paddingTop: "8px" }}>
                        {this.Node.Props.Description}
                    </MUI.Typography>
                )}

                <MUI.FormControl component="fieldset">
                    {this.Node.Props.Explanation && <MUI.FormHelperText>{this.Node.Props.Explanation}</MUI.FormHelperText>}
                    <MUI.FormGroup>
                        {this.Props.Checkboxes.map((checkbox) => {
                            const data = this.Data(instance, checkbox.Id);
                            const checked = data ? data.Value : false;

                            return (
                                <MUI.FormControlLabel
                                    key={checkbox.Id}
                                    control={
                                        <MUI.Checkbox
                                            defaultChecked={checked}
                                            onChange={(e: {}, state: boolean) => {
                                                if (data) {
                                                    data.Value = state;
                                                }
                                            }}
                                        />
                                    }
                                    label={checkbox.Name}
                                />
                            );
                        })}
                    </MUI.FormGroup>
                </MUI.FormControl>
            </MUI.Paper>
        );
    }

    OnValidate(instance) {
        return true;
    }
}
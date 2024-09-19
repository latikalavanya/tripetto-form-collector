// Import Material-UI UMD
const MUI = window["material-ui"];

// Import condition
import "./condition";

@TripettoCollector.node("tripetto-block-dropdown")
class Dropdown extends TripettoCollector.NodeBlock {
  Update(data, id) {
    let value = TripettoCollector.F.FindFirst(
      this.Props.Options,
      option => option.Id === id
    );

    if (!value && !this.Node.Props.Placeholder) {
      value = TripettoCollector.F.ArrayItem(this.Props.Options, 0);
    }

    if (value) {
      data.Set(value.Value || value.Name, value.Id);
    } else {
      data.Set(undefined, "");
    }
  }

  OnRender(instance, action) {
    const slot = this.SlotAssert("option");
    const dropdown = this.DataAssert(instance, slot);

    this.Update(dropdown, dropdown.Reference);

    return (
      <MUI.Paper elevation={1} style={{ padding: "8px 24px 24px" }}>
        {this.Node.Props.NameVisible &&
          this.Node.Props.Name && (
            <MUI.Typography
              variant="headline"
              color="inherit"
              style={{ paddingTop: "8px" }}
            >
              {this.Node.Props.Name}
            </MUI.Typography>
          )}

        {this.Node.Props.Description && (
          <MUI.Typography
            variant="subheading"
            color="inherit"
            style={{ paddingTop: "8px" }}
          >
            {this.Node.Props.Description}
          </MUI.Typography>
        )}

        <MUI.FormControl component="fieldset" style={{ paddingTop: "16px" }}>
          <MUI.FormControl>
            <MUI.Select
              autoWidth
              value={dropdown.Reference}
              onChange={e => this.Update(dropdown, e.target.value)}
            >
              {this.Node.Props.Placeholder && (
                <MUI.MenuItem value="">
                  <em>{this.Node.Props.Placeholder}</em>
                </MUI.MenuItem>
              )}
              {this.Props.Options.map(option => (
                <MUI.MenuItem key={option.Id} value={option.Id}>
                  {option.Name}
                </MUI.MenuItem>
              ))}
            </MUI.Select>
            {this.Node.Props.Explanation && (
              <MUI.FormHelperText>{this.Node.Props.Explanation}</MUI.FormHelperText>
            )}
          </MUI.FormControl>
        </MUI.FormControl>
      </MUI.Paper>
    );
  }

  OnValidate(instance) {
    const slot = this.SlotAssert("option");
    const dropdown = this.DataAssert(instance, slot);

    return !slot.Required || dropdown.Reference !== "";
  }
}

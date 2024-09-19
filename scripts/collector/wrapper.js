// Import Material-UI UMD
const MUI = window["material-ui"];

export class CollectorWrapper extends TripettoCollector.Collector {
  /** Previous button is clicked. */
  clickButtonPrevious() {
    if (this.Observer) {
      this.Observer.Cancel();
    }
  }

  /** Next button is clicked. */
  clickButtonNext() {
    if (this.Observer) {
      this.Observer.Done();
    }
  }

  /** Retrieves the collector rendering. */
  render() {
    if (!this.Instance || !this.Instance.IsRunning) {
      return undefined;
    }

    return (
      <MUI.Grid
        container
        direction="column"
        spacing={24}
        style={{ padding: "24px" }}
      >
        {this.Nodes.map(node => {
          /** Render the provider if it is available. */
          if (node.Block) {
            return (
              <MUI.Grid item key={node.Key}>
                {node.Block.OnRender(node.Instance, node.Observer)}
              </MUI.Grid>
            );
          }

          /** If there is no provider the node should be considered as static text. */
          return (
            <MUI.Grid item key={node.Key}>
              <MUI.Paper elevation={1} style={{ padding: "16px 24px" }}>
                {node.Props.NameVisible &&
                  node.Props.Name && (
                    <MUI.Typography variant="headline" color="inherit">
                      {node.Props.Name}
                    </MUI.Typography>
                  )}
                {node.Props.Description && (
                  <MUI.Typography variant="subheading" color="inherit">
                    {node.Props.Description}
                  </MUI.Typography>
                )}
              </MUI.Paper>
            </MUI.Grid>
          );
        })}
        <MUI.Grid item>
          <MUI.LinearProgress
            variant="determinate"
            value={this.ProgressPercentage}
          />
        </MUI.Grid>
        <MUI.Grid item>
          <MUI.Grid container spacing={8} justify="space-between">
            <MUI.Grid item>
              <MUI.Button
                variant="raised"
                disabled={this.Instance.Steps === 0}
                onClick={() => this.clickButtonPrevious()}
              >
                <MUI.Icon
                  style={{
                    marginRight: "15px"
                  }}
                >
                  navigate_before
                </MUI.Icon>
                Back
              </MUI.Button>
            </MUI.Grid>
            <MUI.Grid item>
              <MUI.Button
                variant="raised"
                color={this.Instance.IsAtEnd ? "secondary" : "primary"}
                disabled={this.IsValidationFailed}
                onClick={() => this.clickButtonNext()}
              >
                {this.Instance.IsAtEnd ? "Complete" : "Next"}
                <MUI.Icon
                  style={{
                    marginLeft: "15px"
                  }}
                >
                  {this.Instance.IsAtEnd ? "check_circle" : "navigate_next"}
                </MUI.Icon>
              </MUI.Button>
            </MUI.Grid>
          </MUI.Grid>
        </MUI.Grid>
      </MUI.Grid>
    );
  }

  OnInstanceStart(instance) {
    // Force an update when data is changed
    instance.Store.GroupedHook(
      "OnStore",
      "framed",
      () => this.OnInstanceRenderUpdate(instance),
      this
    );

    super.OnInstanceStart(instance);
  }

  OnInstanceEnd(instance, type) {
    instance.Store.UnhookContext(this);

    super.OnInstanceEnd(instance, type);
  }
}

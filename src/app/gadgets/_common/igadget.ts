/**
 * Created by jayhamilton on 2/25/17.
 */
interface IGadget {

    run();

    stop();

    toggleConfigMode();

    initializeProperties();

    updateProperties(updatedProperties: any);

    updateData(data: any[]);

    handleError(error: any);

    remove();

    showGadgetControls(enable: boolean);

    configureGadget(instanceId: number, config: any);


}

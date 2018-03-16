/* eslint-disable import/prefer-default-export */
export class DrawBorderService {

    static Draw(storyid, moduleName){
        const selectedDOM = document.getElementById(`r_${storyid}`);
        if(selectedDOM){
            selectedDOM.classList.add("main_story_boxing");
            const selectedModule = document.getElementById(moduleName);
            if (selectedModule) selectedModule.scrollIntoView({behavior: "instant", block: "center", inline: "nearest"});
        }
    }
    static Erase(storyid){
        const selectedDOM = document.getElementById(`r_${storyid}`);
        if(selectedDOM){
            selectedDOM.classList.remove("main_story_boxing");
        }
    }
}

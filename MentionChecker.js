class MentionChecker{
    constructor(nameChecker){
        this.nameChecker=nameChecker;
        this.mentionSigil="@";
        this.regex="/@[A-Za-z0-9]+/g"
    }

    formatMentions(message){
        var localNameChecker=this.nameChecker;
        return message.replace(/@[A-Za-z0-9]+/g,function(match){
            if(localNameChecker.getIDFromName(match.substring(1))!==null){
                return "<strong>"+match+"</strong>";
            }
            else{
                return match;
            }
        });
    }

}

module.exports = MentionChecker
import type { SVGProps } from "react";

interface Props {
  size?: number;
  SVGProps?: SVGProps<SVGSVGElement>;
};

export const CakeIcon = ({ size, ...props }: Props) => {
  size = size ?? 40;
  return (
<svg 
    width={size} 
    height={size} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#prefix__clip0_132_1358)"><path d="M34.683 17.69c-.008 7.319-.003 8.306-.003 9.293.003 1.85-.813 3.412-2.132 4.722-2.68 2.661-6.449 3.803-10.195 4.09a50.042 50.042 0 01-3.788.126c-1.26 0-2.532-.03-3.789-.126-3.746-.287-7.515-1.429-10.195-4.09-1.32-1.31-2.132-2.868-2.132-4.722 0-.987.003-1.977-.003-9.292h32.237z" fill="#FCC21B"/><path d="M34.7 14.307C32.146 10.95 28 8.41 24.004 7.81c-1.184-.177-2.38-.256-3.569-.32-2.694-.147-5.501-.034-8.176.377-2.93.45-6.109 1.791-8.415 3.88-.717.65-1.226 1.514-1.631 2.394C1.285 16.17.877 18.49.877 20.72c0 1.48.242 2.944 1.53 3.766.365.233.807.216 1.212.129.622-.138 1.058-.444 1.676-.104.917.5 1.106 1.575 1.612 2.41.911 1.5 2.942 2.169 4.545 1.533 1.628-.644 2.742 1.018 4.078 1.631 1.592.729 3.504.501 5.026-.275.416-.214.717-.523 1.08-.822.692-.573 1.493-.916 2.385-.944 1.181-.037 2.362.492 3.532.132.965-.293 1.651-1.17 2.16-2.014.434-.717.788-1.64 1.724-1.735.943-.093 1.725.824 2.698.514 1.724-.548 1.977-2.849 1.997-4.398.025-1.91-.248-4.12-1.165-5.817a4.251 4.251 0 00-.267-.419z" fill="#FFF3E0"/><path d="M21.574 11.894c-.025.163-.022.338-.022.495a83.11 83.11 0 01-.029 1.67c-.025 1.114-.056 2.225-.056 3.34 0 .72-.31 2.232.543 2.567.824.326 1.853.155 1.85-1.021-.002-.335 0-.67 0-1.001 0-1.4-.002-2.799 0-4.202 0-.408-.044-.807-.042-1.215.003-.34.014-.785-.233-1.032-.194-.194-.48-.237-.731-.24-.296-.008-.7-.05-.968.105-.2.112-.278.315-.312.534z" fill="#40C0E7"/><path d="M21.54 12.884a2.318 2.318 0 01-.956-1.133c-.143-.355-.242-.816-.222-1.201.048-.926.557-1.78 1.215-2.405.388-.371.86-.838 1.412-.94 1.17-.213 1.988 1.702 2.23 2.566.439 1.563-.458 3.203-2.137 3.36-.44.043-1.156-.016-1.542-.247z" fill="#ED6C30"/><path d="M22.153 12.552a1.095 1.095 0 01-.399-.548 1.695 1.695 0 01-.093-.582c.02-.448.234-.861.506-1.165.164-.18.36-.408.591-.455.49-.105.833.824.931 1.243.183.759-.191 1.552-.894 1.628-.18.017-.481-.011-.642-.12z" fill="#FCC21B"/><path d="M27.888 7.02c-.025.163-.022.34-.022.495-.003.56-.014 1.114-.029 1.67-.025 1.114-.056 2.225-.056 3.34 0 .72-.31 2.232.543 2.567.821.326 1.856.155 1.85-1.021-.002-.332 0-.667 0-1.001 0-1.4-.002-2.796 0-4.202 0-.408-.044-.81-.041-1.215.002-.343.016-.785-.234-1.032-.194-.194-.48-.234-.731-.24-.296-.008-.7-.05-.965.105-.202.112-.284.315-.315.534z" fill="#40C0E7"/><path d="M27.854 8.01a2.333 2.333 0 01-.956-1.133 3.078 3.078 0 01-.222-1.201c.048-.923.56-1.78 1.215-2.405.388-.371.86-.838 1.412-.94 1.17-.213 1.991 1.702 2.233 2.566.439 1.563-.461 3.203-2.14 3.36-.44.043-1.16-.016-1.542-.247z" fill="#ED6C30"/><path d="M28.456 7.687a1.03 1.03 0 01-.402-.515 1.48 1.48 0 01-.093-.543c.017-.422.234-.807.51-1.091.162-.169.362-.383.593-.425.492-.098.832.77.936 1.162.183.711-.194 1.454-.897 1.527-.183.017-.484-.011-.647-.115z" fill="#FCC21B"/><path d="M16.804 4.781c-.025.163-.022.34-.022.495-.003.56-.015 1.114-.029 1.67-.025 1.115-.056 2.226-.056 3.34 0 .72-.31 2.232.543 2.567.824.326 1.856.155 1.85-1.02-.002-.333 0-.667 0-1.002 0-1.4-.002-2.796 0-4.202 0-.408-.044-.81-.042-1.215.003-.343.015-.785-.233-1.032-.194-.194-.48-.234-.731-.24-.296-.008-.7-.05-.968.105-.2.112-.281.315-.312.534z" fill="#40C0E7"/><path d="M16.77 5.771a2.318 2.318 0 01-.956-1.133c-.143-.355-.242-.816-.222-1.201.048-.923.557-1.78 1.215-2.405.388-.368.86-.838 1.412-.936 1.17-.214 1.988 1.701 2.233 2.565.439 1.563-.459 3.203-2.14 3.36-.44.043-1.16-.016-1.542-.25z" fill="#ED6C30"/><path d="M17.4 5.448a1.122 1.122 0 01-.419-.568 1.62 1.62 0 01-.095-.602c.02-.464.244-.892.531-1.204.169-.186.377-.419.616-.47.512-.104.872.853.979 1.286.194.784-.203 1.606-.937 1.684-.19.02-.506-.01-.675-.126z" fill="#FCC21B"/><path d="M11.798 11.306c-.025.163-.023.338-.023.495a82.365 82.365 0 01-.028 1.67c-.025 1.115-.056 2.226-.056 3.34 0 .72-.31 2.233.543 2.567.821.326 1.853.155 1.85-1.02-.002-.335 0-.67 0-1.002 0-1.4-.002-2.799 0-4.202 0-.408-.045-.807-.042-1.215.003-.34.014-.785-.233-1.032-.194-.194-.478-.236-.731-.24-.296-.008-.7-.05-.965.105-.203.11-.284.312-.315.534z" fill="#40C0E7"/><path d="M11.761 12.293a2.318 2.318 0 01-.956-1.133c-.143-.354-.242-.816-.222-1.2.048-.926.557-1.781 1.215-2.406.388-.37.863-.838 1.412-.939 1.17-.214 1.988 1.702 2.233 2.565.439 1.564-.459 3.204-2.138 3.361-.438.045-1.158-.014-1.544-.248z" fill="#ED6C30"/><path d="M12.369 11.97a1.134 1.134 0 01-.425-.58 1.68 1.68 0 01-.098-.613c.022-.475.25-.91.54-1.231.174-.192.385-.43.63-.481.523-.11.888.872.995 1.313.194.802-.205 1.64-.956 1.721-.194.02-.515-.01-.686-.129z" fill="#FCC21B"/><path d="M6.375 6.263c-.025.166-.022.34-.022.495a82.806 82.806 0 01-.028 1.671c-.026 1.111-.057 2.225-.057 3.338 0 .72-.309 2.23.543 2.568.824.324 1.857.155 1.85-1.02-.002-.335 0-.667 0-1.002 0-1.4-.002-2.798 0-4.202 0-.408-.044-.807-.041-1.218.003-.34.014-.784-.234-1.032-.194-.194-.48-.236-.731-.242-.295-.005-.7-.05-.968.104-.2.116-.28.321-.312.54z" fill="#40C0E7"/><path d="M6.339 7.25a2.324 2.324 0 01-.957-1.13c-.143-.354-.241-.816-.222-1.2.048-.926.557-1.781 1.215-2.406.388-.37.86-.84 1.412-.939 1.17-.214 1.989 1.702 2.233 2.565.44 1.564-.458 3.203-2.137 3.36-.439.04-1.159-.019-1.544-.25z" fill="#ED6C30"/><path d="M6.977 6.916a1.194 1.194 0 01-.402-.593 1.96 1.96 0 01-.093-.628c.02-.483.234-.933.51-1.26.162-.194.362-.438.593-.492.492-.112.835.892.936 1.342.183.821-.194 1.676-.9 1.76-.18.023-.48-.008-.644-.129z" fill="#FCC21B"/><path d="M34.962 14.726a3.289 3.289 0 00-.265-.419c-.073-.096-.152-.191-.228-.284.096.473 1.477 8.612-16.104 8.612-17.404 0-16.225-7.976-16.107-8.595-.017.034-.034.067-.048.101C1.282 16.17.874 18.49.874 20.72c0 1.479.242 2.944 1.53 3.766.366.233.807.216 1.212.129.622-.138 1.058-.444 1.677-.104.916.5 1.105 1.575 1.611 2.41.911 1.5 2.942 2.169 4.545 1.533 1.629-.644 2.742 1.018 4.078 1.631 1.592.729 3.505.5 5.026-.275.416-.214.717-.523 1.08-.822.692-.573 1.494-.916 2.385-.945 1.181-.036 2.363.493 3.533.133.964-.293 1.65-1.17 2.16-2.014.433-.717.787-1.64 1.724-1.735.942-.093 1.724.824 2.697.514 1.724-.548 1.977-2.849 1.997-4.399.02-1.91-.25-4.12-1.167-5.816z" fill="#FFE0B2"/></g><defs><clipPath id="prefix__clip0_132_1358">
    <path fill="#fff" transform="translate(.5)" d="M0 0h36v36H0z"/></clipPath></defs>
</svg>

  );
}
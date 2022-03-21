import Calendar from "react-calendar";
import styled from "styled-components";

const CustomCalendar = styled(Calendar)`
    .react-calendar {
        &__navigation {
            display: flex;
            justify-content: center;
            padding-bottom: 0.5rem;
            align-items: center;
            &__label {
                flex-grow: 0 !important;
                font-weight: 700;
                margin: 0 1rem;
                color: ${props => props.theme.colors.text2};
            }
            &__prev-button, &__next-button {
                &[disabled] {
                    display: none;
                }
                color: ${props => props.theme.colors.background9};
            }
        }
        &__month-view {
            &__weekdays {
                padding: 0.5rem 0;
                &__weekday {
                    text-align: center;
                    color: ${props => props.theme.colors.text2};
                    abbr:where([title]) {
                        text-decoration: none;
                        text-transform: uppercase;
                        font-weight: 500;
                    }
                }
            }
            &__days {
                &__day {
                    font-weight: 500;
                    padding: 0.5rem;
                    color: ${props => props.theme.colors.text2};
                    &[disabled], &--neighboringMonth {
                        color: ${props => props.theme.colors.background9};
                    }
                    abbr {
                        display: table-cell;
                        height: 2.5rem;
                        width: 2.5rem;
                        vertical-align: middle;
                    }
                }
            }
        }
        &__tile {
            &--active {
                color: ${props => props.theme.colors.primary1};
                abbr {
                    background: ${props => props.theme.colors.background10};
                    border-radius: 50%;
                }
            }
        }
    }
`;

export default CustomCalendar;
